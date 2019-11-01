CC := g++
FLAGS := -std=c++14 -pedantic -Wall -Wctor-dtor-privacy -Wmissing-declarations -Wmissing-include-dirs
LFLAGS = $(FLAGS) -c
SOURCES := $(shell echo *.cpp)
# PACKAGES := constraints
OBJECTS = $(SOURCES:.cpp=.o)# $(foreach PACK, $(PACKAGES), $(PACK)/$(PACK).o)

EXECUTABLE = algorithm

all: $(EXECUTABLE) 

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(FLAGS) $^ -o $@

%.o: %.cpp
	$(CC) $(LFLAGS) $< -o $@

clean: 
	rm -f *.o $(EXECUTABLE)
