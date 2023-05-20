import random
import string
from datetime import datetime

import boto3


def generate_random_string(length: int = 10):
    """QR 코드 생성을 위한 랜덤 문자열 생성

    Args:
        length (int, optional): 랜덤 문자열 길이. Defaults to 10.

    Returns:
        str: 랜덤 문자열

    Examples:
        >>> generate_random_string()
        '3J4h5k6l7M'
    """
    # 영문 대소문자와 숫자를 포함한 모든 문자열
    letters = string.ascii_letters + string.digits
    random_string = "".join(random.choice(letters) for _ in range(length))
    return random_string


def str_to_datetime(dt: str):
    """str 타입의 날짜를 datetime 타입으로 변환

    Args:
        dt (str): 날짜 문자열

    Returns:
        datetime: datetime 객체

    Examples:
        >>> str_to_datetime("2021-08-01 00:00:00")
        datetime.datetime(2021, 8, 1, 0, 0)
    """
    return datetime.strptime(dt, "%Y-%m-%dT%H:%M:%S")


def upload_file_to_s3(local_file_path, bucket_name, s3_file_path) -> str | None:
    s3 = boto3.client("s3")

    try:
        # 로컬 파일을 읽기 모드로 열기
        with open(local_file_path, "rb") as file:
            # S3 버킷에 파일 업로드
            s3.upload_fileobj(
                file,
                bucket_name,
                s3_file_path,
            )
        return s3_file_path
    except Exception as e:
        print("파일 업로드 실패:", str(e))
        return None
