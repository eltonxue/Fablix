file = open("query_measurements.txt", "r")
# file = open("scaled.txt", "r")

TS_list = []
TJ_list = []

queries_run = 0

while True:
    line1 = file.readline()
    if not line1:
        break

    line1Split = line1.split(';')

    TS = int(line1Split[0])
    TJ = int(line1Split[1])

    TS_list.append(TS)
    TJ_list.append(TJ)

    queries_run += 1

print("Total Queries: " + str(queries_run))
print("Average TS: " + str(sum(TS_list) / len(TS_list)))
print("Average TJ: " + str(sum(TJ_list) / len(TJ_list)))
