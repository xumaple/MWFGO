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
    for (auto c: cm->allConstraints())
    {
        delete c;
    }
    //Delete leaders
    for (auto l: leaders)
    {
        delete l;
    }
    //Delete people
    for (auto p: people)
    {
        delete p;
    } 
    //Delete Groups
    for (auto g: groups)
    {
        delete g;
    } 
    //Delete limiters
    for (auto l: limiters)
    {
        delete l;
    } 
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
    //Compute all the differences between people
    for (auto it = people.begin(); it != people.end; ++it)
    {
        auto nextIt = it;
        for (++nextIt; nextIt != people.end(); ++nextIt)
        {
            Individual::computeDiffs(*it, *nextIt);
        } 
    }

    //Assign all the people to a group
    

    //Swap people between groups until the groups converge
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

