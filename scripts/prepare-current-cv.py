"""Prepare an updated public CV copy, preserving the supplied original."""
import argparse
import hashlib
from pathlib import Path
import re
import pymupdf

parser = argparse.ArgumentParser()
parser.add_argument("source", type=Path)
parser.add_argument("--output", type=Path, default=Path("public/cv/Mehdi-Chmiti-CV.pdf"))
args = parser.parse_args()
assert args.source.resolve() != args.output.resolve(), "Never overwrite the original"
before = hashlib.sha256(args.source.read_bytes()).hexdigest()
phone_pattern = re.compile(r"\b0[5-7](?:[ .-]?\d){8}\b")
removed = []
doc = pymupdf.open(args.source)
for page in doc:
    replacement = None
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            text = "".join(span["text"] for span in line["spans"])
            matches = phone_pattern.findall(text)
            if matches:
                removed.extend(matches)
                assert "mehdi.chmiti.ing@gmail.com" in text, "Review unexpected contact layout"
                replacement = line["spans"][0]["origin"]
                rect = pymupdf.Rect(line["bbox"])
                rect.x0 -= 0.5
                rect.x1 += 0.5
                page.add_redact_annot(rect, fill=(1, 1, 1))
    page.apply_redactions(images=0)
    if replacement:
        page.insert_text(replacement, "Casablanca | mehdi.chmiti.ing@gmail.com", fontsize=9.5, fontname="helv", color=(0.12, 0.28, 0.38))
        email_rect = page.search_for("mehdi.chmiti.ing@gmail.com")[-1]
        page.insert_link({"kind":pymupdf.LINK_URI,"from":email_rect,"uri":"mailto:mehdi.chmiti.ing@gmail.com"})
    for link in page.get_links():
        if link.get("uri", "").startswith("tel:"):
            page.delete_link(link)
doc.set_metadata({"title": "Mehdi Chmiti - IA et Data - CV public", "author": "Mehdi Chmiti"})
doc.del_xml_metadata()
args.output.parent.mkdir(parents=True, exist_ok=True)
doc.save(args.output, garbage=4, deflate=True)
doc.close()
assert hashlib.sha256(args.source.read_bytes()).hexdigest() == before
with pymupdf.open(args.output) as public:
    text = "\n".join(page.get_text() for page in public)
    assert not phone_pattern.search(text)
    assert all(phone not in text for phone in removed)
    assert all(value in text for value in ["mehdi.chmiti.ing@gmail.com", "MIFA", "5e", "9 juillet", "9 septembre 2026"])
    for i, page in enumerate(public):
        preview = Path(f"tmp/pdfs/cv-current-public-{i}.png")
        preview.parent.mkdir(parents=True, exist_ok=True)
        page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5)).save(preview)
print(f"Prepared {args.output}; removed phone; verified PDF content and unchanged original.")
