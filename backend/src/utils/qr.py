import os
import qrcode
from src.utils import utils

# taking image which user wants
# in the QR code center
# Logo_link = "jointX.png"

# logo = Image.open(Logo_link)

# taking base width
# basewidth = 100

# adjust image size
# wpercent = basewidth / float(logo.size[0])
# hsize = int((float(logo.size[1]) * float(wpercent)))
# # logo = logo.resize((basewidth, hsize), Image.ANTIALIAS)
# QRcode = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H)

# # taking url or text
# url = "https://glitch-hack.com/"

# # adding URL or text to QRcode
# QRcode.add_data(url)

# # generating QR code
# QRcode.make()

# # taking color name from user
# # QRcolor = "Blue"

# # adding color to QR code
# QRimg = QRcode.make_image(fill_color=QRcolor, back_color="white").convert("RGB")

# # set size of QR code
# pos = (
#     (QRimg.size[0] - logo.size[0]) // 2,
#     (QRimg.size[1] - logo.size[1]) // 2,
# )
# QRimg.paste(logo, pos)

# # save the QR code generated
# QRimg.save("jointX_QR.png")

# print("QR code generated!")


def generate_qr(event_id: int, code: str):
    host = os.getenv("HOST", "http://localhost:8000")
    url = f"{host}/event/{event_id}/checkin/{code}"

    img = qrcode.make(url)

    os.makedirs("qr", exist_ok=True)

    img.save(f"qr/{code}.png")

    res = utils.upload_file_to_s3(
        local_file_path=f"qr/{code}.png",
        bucket_name="tapcheck-bucket",
        s3_file_path=f"qr/{event_id}/{code}.png",
    )

    return res
