import random
import string


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
