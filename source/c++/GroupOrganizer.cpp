#include "GroupOrganizer.h"
#include <string>
#include <vector>

namespace py = boost::python;

double* toArray(const py::object &iterable);


void GroupOrganizer::createGroups()
{
    for (auto l: leaders)
    {
        groups.push_back(new Group(limiters,l));
    }
}

GroupOrganizer::GroupOrganizer()
{
    //Creates a constraint manager
    cm = &ConstraintManager::getInstance();

    //As of now adds a weight limiter
    limiters.push_back(new WeightLimiter());
}

GroupOrganizer::~GroupOrganizer()
{
    //Delete constraints
    
    //Delete leaders
    
    //Delete people
    
    //Delete Groups
    
    //Delete limiters
}

void GroupOrganizer::addLeader(std::string name, py::list &traits)
{
    //Create a leader
    double* arr = toArray(traits);
    leaders.push_back(new Individual(arr));

    //Create a group with the leader
}

void GroupOrganizer::addPerson(std::string name, py::list &traits)
{
    //Create a person
    double* arr = toArray(traits);
    people.push_back(new Individual(arr));
}

void GroupOrganizer::addTrait(std::string name, int formType, int numChoices)
{
    //Multiple Choice
    if (formType == 1)
    {

    }
    //Time Frame
    else if(formType == 2)
    {
        cm->addConstraint(new TimeConstraint(), name);
    }
    //Text box
    else
    {

    }

}

void GroupOrganizer::addLimiter()
{
    //Create a limiter
    //Add to list of limiters
}

void GroupOrganizer::runAlgorithm()
{
    //Assuming all data has been read in, runs the algorithm
}

double* toArray(const py::object &iterable)
{
    std::vector<double> t = std::vector<double>(py::stl_input_iterator<double>(iterable), py::stl_input_iterator<double>());
    double *arr = new double[t.size()];
    for (size_t i = 0; i < t.size(); ++i)
    {
        arr[i] = t[i];
    }
    return arr;
}

