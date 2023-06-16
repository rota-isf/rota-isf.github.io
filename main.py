from xlrd import *

wb = open_workbook("file.xls")
ws = wb.sheet_by_index(1)

for i in range(1, 7061):
    with open("assets/MD/contents/docs.md", "a") as f:
        for j in range(3, 10):
            value = str(ws.cell_value(i, j)).replace("\n", " ")
            f.write(value + "\n")
        f.write(f"{1970+i}\n")
        f.write("---------------------\n")
        