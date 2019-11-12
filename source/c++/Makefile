CC := g++
FLAGS := -std=c++14 -pedantic -Wall -Wctor-dtor-privacy -Wmissing-declarations -Wmissing-include-dirs
LFLAGS = $(FLAGS) -c -fPIC
MAIN_SOURCES := pylib.cpp
SOURCES := $(filter-out test_%.cpp $(MAIN_SOURCES), $(shell echo *.cpp))
# PACKAGES := constraints
OBJECTS = $(SOURCES:.cpp=.o)
MAIN_OBJECTS = $(MAIN_SOURCES:.cpp=.o)

TESTS := $(filter test_%.cpp, $(shell echo *.cpp))
TEST_OBJECTS = $(TESTS:.cpp=.o)

EXE = algorithm
TEST_EXE = tests

PYTHON_VERSION := 3.6
PYTHON_INC := /usr/include/python$(PYTHON_VERSION)
BOOST_INC := /usr/include/boost
BOOST_LIB_LOCATION := /usr/lib/x86_64-linux-gnu
BOOST_LIB_FILE := boost_python3

CInc := -I$(BOOST_INC) -I$(PYTHON_INC)

CLinkFlags = -shared -Wl,-soname,$@ -Wl,-rpath,$(BOOST_LIB_LOCATION) -L$(BOOST_LIB_LOCATION) -l$(BOOST_LIB_FILE)

all: $(EXE) 

test: $(TEST_EXE)
	./$(TEST_EXE)


$(EXE): $(OBJECTS) $(MAIN_OBJECTS)
	$(CC) $^ $(FLAGS) $(CLinkFlags) -o $@

$(TEST_EXE): $(TEST_OBJECTS) $(filter-out main.o, $(OBJECTS))
	$(CC) $(FLAGS) $^ -o $@

main.o: main.cpp
	$(CC) $(LFLAGS) $(CInc) $< -o $@

%.o: %.cpp
	$(CC) $(LFLAGS) $< -o $@

clean: 
	rm -f *.o $(EXE) $(TEST_EXE)
