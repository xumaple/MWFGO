CC := g++
FLAGS := -std=c++14 -pedantic -Wall -Wctor-dtor-privacy -Wmissing-declarations -Wmissing-include-dirs
LFLAGS = $(FLAGS) -c
SOURCES := $(shell echo *.cpp)
OBJECTS = $(SOURCES:.cpp=.o)
#DEPS = $(OBJECTS:.o=.d)
HEADERS = $(shell echo *.h)

EXECUTABLE = algorithm

all: $(EXECUTABLE) 

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(FLAGS) $^ -o $@

#-include $(DEPS)

%.o: %.cpp
	$(CC) $(LFLAGS) $< -o $@

clean: 
	rm -f *.o $(EXECUTABLE)
