import json
file = open("grama.txt", "r")
file2 = open("gramap.json", "w")
dictArray = []
for i in file:
  i = i.strip().split("\t")
  dictArray.append({
    "key": i[0], "value": i[1]
  })
json_string = json.dumps({
  "divisions": dictArray
})
file2.write(json_string)
file.close()
file2.close()