CC := g++
FLAGS := -std=c++14 -pedantic -Wall -Wctor-dtor-privacy -Wmissing-declarations -Wmissing-include-dirs
LFLAGS = $(FLAGS) -c
SOURCES := $(filter-out test_%.cpp, $(shell echo *.cpp))
# PACKAGES := constraints
OBJECTS = $(SOURCES:.cpp=.o)

TESTS := $(filter test_%.cpp, $(shell echo *.cpp))
TEST_OBJECTS = $(TESTS:.cpp=.o)

EXE = algorithm
TEST_EXE = tests

test: $(TEST_EXE)

all: $(EXE) 

$(EXE): $(OBJECTS)
	$(CC) $(FLAGS) $^ -o $@

$(TEST_EXE): $(TEST_OBJECTS) $(filter-out main.o, $(OBJECTS))
	$(CC) $(FLAGS) $^ -o $@
	./$(TEST_EXE)

%.o: %.cpp
	$(CC) $(LFLAGS) $< -o $@

clean: 
	rm -f *.o $(EXE) $(TEST_EXE)
