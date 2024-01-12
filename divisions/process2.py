0
import json
file = open("grama2.txt", "r")
file2 = open("grama.json", "w")
dictArray = []
for i in file:
  i = i.strip().split("\t")
  dictArray.append({
    "key": i[0], "value": i[1], "province": i[2].split("/")[-1].strip(), "district": i[3].split("/")[-1].strip(), "divisionalSecretariat": i[4].split("/")[-1].strip()
  })
json_string = json.dumps({
  "divisions": dictArray
})
file2.write(json_string)
file.close()
file2.close()