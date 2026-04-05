import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request


API_BASE = "https://neocities.org/api"


def normalize_dir(directory):
    trimmed = directory.strip("/")
    if not trimmed:
        raise ValueError("Please provide a non-empty --dir value, for example --dir Card")
    return trimmed


def make_auth_header(args):
    api_key = args.api_key or os.environ.get("NEOCITIES_API_KEY")
    username = args.username or os.environ.get("NEOCITIES_USERNAME")
    password = args.password or os.environ.get("NEOCITIES_PASSWORD")

    if api_key:
        return {"Authorization": f"Bearer {api_key}"}

    if username and password:
        raw = f"{username}:{password}".encode("utf-8")
        encoded = base64.b64encode(raw).decode("ascii")
        return {"Authorization": f"Basic {encoded}"}

    raise ValueError(
        "Missing auth. Provide --api-key, or --username with --password, or set NEOCITIES_* environment variables."
    )


def api_get(endpoint, headers):
    request = urllib.request.Request(f"{API_BASE}{endpoint}", headers=headers)
    try:
        with urllib.request.urlopen(request) as response:
            payload = response.read().decode("utf-8")
    except urllib.error.HTTPError as error:
        body = error.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"API request failed ({error.code} {error.reason}): {body}") from error

    data = json.loads(payload)
    if data.get("result") != "success":
        raise RuntimeError(f"API returned non-success result: {json.dumps(data, ensure_ascii=False)}")
    return data


def build_download_base(info, args):
    if args.site_domain:
        domain = args.site_domain.replace("https://", "").replace("http://", "").rstrip("/")
        return f"https://{domain}"

    domain = (info or {}).get("domain")
    if domain:
        domain = domain.replace("https://", "").replace("http://", "").rstrip("/")
        return f"https://{domain}"

    site_name = args.site_name or (info or {}).get("sitename")
    if not site_name:
        raise RuntimeError("Could not determine site name for downloads. Provide --site-name explicitly.")
    return f"https://{site_name}.neocities.org"


def filter_files(files, target_dir):
    prefix = f"{target_dir}/"
    return [
        file_info
        for file_info in files
        if not file_info.get("is_directory") and (
            file_info.get("path") == target_dir or file_info.get("path", "").startswith(prefix)
        )
    ]


def download_file(url, destination):
    os.makedirs(os.path.dirname(destination), exist_ok=True)
    try:
        with urllib.request.urlopen(url) as response:
            content = response.read()
    except urllib.error.HTTPError as error:
        raise RuntimeError(f"Download failed ({error.code} {error.reason}) for {url}") from error

    with open(destination, "wb") as file_handle:
        file_handle.write(content)


def parse_args():
    parser = argparse.ArgumentParser(
        description="Download a Neocities folder by listing files from the API and fetching them from the public site."
    )
    parser.add_argument("--dir", required=True, help="Folder path on Neocities, for example Card")
    parser.add_argument("--out", default="./neocities-backup", help="Local output directory")
    parser.add_argument("--api-key", dest="api_key", help="Neocities API key")
    parser.add_argument("--username", help="Neocities username")
    parser.add_argument("--password", help="Neocities password")
    parser.add_argument("--site-name", dest="site_name", help="Override Neocities site name")
    parser.add_argument("--site-domain", dest="site_domain", help="Override custom domain")
    parser.add_argument("--dry-run", action="store_true", help="List files without downloading")
    return parser.parse_args()


def main():
    args = parse_args()
    target_dir = normalize_dir(args.dir)
    auth_headers = make_auth_header(args)

    list_data = api_get("/list", auth_headers)
    info_data = api_get("/info", auth_headers)

    files = filter_files(list_data.get("files", []), target_dir)
    if not files:
        print(f'No files found under "{target_dir}".')
        return 0

    download_base = build_download_base(info_data.get("info"), args)
    output_root = os.path.abspath(args.out)

    print(f'Found {len(files)} file(s) under "{target_dir}".')
    print(f"Download base: {download_base}")
    print(f"Output root: {output_root}")

    if args.dry_run:
        for file_info in files:
            print(file_info["path"])
        return 0

    for file_info in files:
        parts = file_info["path"].split("/")
        quoted_path = "/".join(urllib.parse.quote(part) for part in parts)
        remote_url = f"{download_base}/{quoted_path}"
        local_path = os.path.join(output_root, *parts)
        print(f'Downloading {file_info["path"]}')
        download_file(remote_url, local_path)

    print("Done.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(str(error), file=sys.stderr)
        raise SystemExit(1)
