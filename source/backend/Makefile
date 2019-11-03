EXE := algorithm
FOLDER := c++
FOLDER_EXE := $(FOLDER)/$(EXE)
EXESO = $(EXE).so

all: $(EXE)
	echo 'Yay compilation successful!'

test:
	cd $(FOLDER) && make $@

$(EXE): $(FOLDER_EXE)
	cp $(FOLDER_EXE) $(EXESO)

$(FOLDER_EXE): 
	cd $(FOLDER) && make $(EXE)

clean:
	rm -f algorithm
	cd $(FOLDER) && make $@ 
