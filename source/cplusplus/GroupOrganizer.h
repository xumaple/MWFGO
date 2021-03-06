#ifndef GroupOrganizer_h
#define GroupOrganizer_h
/*
 * This is the algorithm class that will be called from Python to perform all of the calculations
 */

#include <boost/python.hpp>
#include <iostream>
#include <string>
#include <vector>
#include "group.h"
#include "individual.h"
#include "timeConstraint.h"
#include "multipleChoiceConstraint.h"
#include "constraintManager.h"
#include "weightLimiter.h"

namespace py = boost::python;

class GroupOrganizer
{
private:
    //Constraints (traits that are enforced)
    ConstraintManager *cm;
    
    //List of Leaders
    std::vector<Individual*> leaders;

    //List of People
    std::vector<Individual*> people;

    //List of Groups
    std::vector<Group*> groups;

    //List of Group Sizes
    std::vector<size_t> groupSizes;

    //Create groups
    void createGroups();

    //Clear groups
    void clearGroups();

public:
    //Constructor
    GroupOrganizer();

    //Destructor
    ~GroupOrganizer();

    //Add leader
    void addLeader(std::string name, py::list &traits);

    //Add person
    void addPerson(std::string name, py::list &traits);

    //Add traits
    void addTrait(std::string name, int formType);

    //Add limiters
    void addLimiter(/*Not quite sure how to instantiate these*/);

    //Print all the groups (Used for testing)
    std::string printGroups();

    //Parts of the algorithm
    void partA();
    void partB();
    void partC();
    void genPerms();

    //Runs algorithm
    void runAlgorithm();

    //Used for debugging in Python
    void printDebug();

};

#endif /* GroupOrganizer_h */
