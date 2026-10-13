"""Prepare a public copy; never modify the supplied CV in place."""
from pathlib import Path
import re
import pymupdf

source = Path(r"C:\Users\mehdi\Desktop\CV_Mehdi_CHMITI_Ingenieur_Informatique.pdf")
target = Path("public/cv/Mehdi-Chmiti-CV-avant-MIFA.pdf")
doc = pymupdf.open(source)
private_rows = []
for page in doc:
    background = tuple(v / 255 for v in page.get_pixmap().pixel(2, 160)[:3])
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            text = "".join(span["text"] for span in line["spans"]).strip()
            if text.startswith(("Tél", "Tel", "Adresse")):
                private_rows.append(text)
                rect = pymupdf.Rect(line["bbox"])
                rect.x0 -= 1
                rect.x1 += 1
                rect.y0 -= 1
                rect.y1 += 1
                page.add_redact_annot(rect, fill=background)
                if text.startswith("Adresse"):
                    location_rect = rect
    page.apply_redactions(images=0)
    if "location_rect" in locals():
        page.insert_text((location_rect.x0 + 1, location_rect.y1 - 3), "Localisation : Casablanca, Maroc", fontsize=6.24, fontname="helv", color=(0.78, 0.81, 0.89))
    page.insert_text((205, 810), "Version anterieure au stage MIFA Yamaha Maroc - coordonnees personnelles retirees.", fontsize=6.5, fontname="helv", color=(0.35, 0.4, 0.48))

doc.set_metadata({"title": "Mehdi Chmiti - CV avant le stage MIFA (version publique)", "author": "Mehdi Chmiti"})
doc.del_xml_metadata()
target.parent.mkdir(parents=True, exist_ok=True)
doc.save(target, garbage=4, deflate=True)
doc.close()

with pymupdf.open(target) as public:
    text = "\n".join(page.get_text() for page in public)
    for row in private_rows:
        value = row.split(":", 1)[-1].strip()
        assert value not in text, "Private contact data remained in public PDF"
    assert not re.search(r"\b0[5-7](?:[ .-]?\d){8}\b", text), "Phone remained"
    assert "mehdi.chmiti.ing@gmail.com" in text
    assert "Casablanca" in text
    preview = Path("tmp/pdfs/cv-public.png")
    preview.parent.mkdir(parents=True, exist_ok=True)
    public[0].get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5)).save(preview)
print(f"Prepared {target}; removed {len(private_rows)} private contact rows; verified PDF text.")
