from algorithm import GroupOrganizer

go = GroupOrganizer()
go.addTrait("Time", 2)

go.addLeader("Hubear", [1.00000005])
go.addLeader("Cucumbear", [4.00000008])

go.addPerson("Frank", [1.00000004])
go.addPerson("Wesley", [2.00000004])
go.addPerson("Maple", [5.00000006])
go.addPerson("Eddy", [3.00000006])
go.addPerson("Michael", [2.00000003])
go.addPerson("Michael2", [1.00000005])

go.printDebug()
go.runAlgorithm()
go.printGroups()