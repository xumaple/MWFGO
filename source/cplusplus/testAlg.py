from algorithm import GroupOrganizer

go = GroupOrganizer()
go.addTrait("Time", 2)

go.addLeader("Hubear", [1.00000004])
go.addLeader("Cucumbear", [5.00000008])

go.addPerson("Frank", [1.00000004])
go.addPerson("Wesley", [2.00000004])
go.addPerson("Maple", [5.00000006])
go.printDebug()
go.runAlgorithm()
go.printGroups()