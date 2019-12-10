#include "GroupOrganizer.h"
#include <iostream>
#include <algorithm>
#include <random>
#include <string>
#include <vector>
#include <cassert>
#include <ctime>

namespace py = boost::python;

double* toArray(const py::list &list);


void GroupOrganizer::createGroups()
{
    for (auto l: leaders)
    {
        //List of limiters
        std::vector<Limiter*> limiters;
        limiters.push_back(new WeightLimiter());

        groups.push_back(new Group(limiters, l));
        groupSizes.push_back(5);
    }
}


void GroupOrganizer::clearGroups()
{
    for (auto g: groups)
    {
        g->clearMembers();
    }
}

GroupOrganizer::GroupOrganizer()
{
    //Set double precision
    std::cout.precision(9);

    //Initialize random seed
    srand(time(NULL));

    //Creates a constraint manager
    cm = &ConstraintManager::getInstance();
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
}

void GroupOrganizer::addLeader(std::string name, py::list &traits)
{
    //Create a leader
    double* arr = toArray(traits);
    leaders.push_back(new Individual(arr, name));

    //Create a group with the leader
}

void GroupOrganizer::addPerson(std::string name, py::list &traits)
{
    //Create a person
    double* arr = toArray(traits);
    people.push_back(new Individual(arr, name));
}

void GroupOrganizer::addTrait(std::string name, int formType)
{
    //Multiple Choice
    if (formType == 1)
    {
        cm->addConstraint(new MultipleChoiceConstraint(), name);
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

void GroupOrganizer::printGroups()
{
    for (auto it = groups.begin(); it != groups.end(); ++it)
    {
        std::cout << "Group " << (*it)->getLeader()->getName() << "\n";
        for (auto it2 = (*it)->getMembers().begin(); it2 != (*it)->getMembers().end(); ++it2)
        {
            std::cout << (*it2)->getName() << "\n";
        }
        std::cout << "\n";
    }
}

void GroupOrganizer::partA()
{
    //Assuming all data has been read in, runs the algorithm
    //Compute all the differences between people
    for (auto it = people.begin(); it != people.end(); ++it)
    {
        auto nextIt = it;
        for (++nextIt; nextIt != people.end(); ++nextIt)
        {
            Individual::computeDiffs(*it, *nextIt);
        } 
    }

    for (auto it = leaders.begin(); it != leaders.end(); ++it)
    {
        for (auto it2 = people.begin(); it2 != people.end(); ++it2)
        {
            Individual::computeDiffs(*it, *it2);
        }
    }
}

void GroupOrganizer::partB()
{
    //Assign all the people to a group
    shuffle(people.begin(), people.end(), std::default_random_engine(rand())); 
    for (auto it = people.begin(); it != people.end(); ++it)
    {
        bool found = false;
        //Find a group that works
        for (auto it2 = groups.begin(); it2 != groups.end(); ++it2)
        {
            if ((*it2)->addIndividual(*it, false)) {
                found = true;
                break;
            }
        }
        
        //We need to force add the individual
        if (!found)
        {
            //Choose a random group and force add
            while (!found) {
                found = groups[rand() % groups.size()]->addIndividual(*it, true);
            }
        }


    }
}

void GroupOrganizer::partC()
{
    //Does nothing atm
    //Swap people between groups until the groups converge
}

void GroupOrganizer::genPerms()
{
    std::vector<int> peoplePositions;

    // Change total size to match group sizes
    size_t totalSize = 5 * groups.size();
    while (people.size() < totalSize)
    {
        //Represents skip
        people.push_back(nullptr);
    }

    for (size_t i = 0; i < people.size(); ++i)
    {
        peoplePositions.push_back(i);
    }

    // Don't need to sort since already sorted
    //std::sort(peoplePositions.begin(), peoplePositions.end());
    do
    {
        // Check if this permutation satisfies the grouping
        size_t i = 0;
        size_t groupIndex = 0;
        for (; i < peoplePositions.size(); ++i)
        {
            Individual* person = people[peoplePositions[i]];
            // Run into a skip value (nullptr)
            if (!person)
            {
                groupIndex = (groupIndex + 1) % groups.size();
                continue;
            }

            // Check if group is full
            if (groupSizes[groupIndex] == groups[groupIndex]->getMembers().size())
            {
                --i;
                groupIndex = (groupIndex + 1) % groups.size();
                continue;
            }
            
            // Check if we can add the person to the group
            std::cout << groups[groupIndex]->getLeader()->getName() << std::endl;
            std::cout << person->getName() << std::endl;
            if (!groups[groupIndex]->addIndividual(person, false))
            {
                clearGroups();
                break;
            }

            groupIndex = (groupIndex + 1) % groups.size();
        }

        //Check if permutation worked
        if (i == peoplePositions.size())
        {
            break;
        }
    } while (std::next_permutation(peoplePositions.begin(), peoplePositions.end()));
}

void GroupOrganizer::runAlgorithm()
{
    assert(groups.empty());
    std::cout << "Creating groups\n";
    createGroups();
    std::cout << "PartA\n";
    partA();
    //partB();
    //partC();
    std::cout << "GenPerms\n";
    genPerms();
}

void GroupOrganizer::printDebug()
{
    std::vector<int> indices;
    indices.push_back(0);
    std::cout << "Leaders size:" << leaders.size() << std::endl;
    if (!leaders.empty())
    {
        std::cout << "Leader name: " << leaders[0]->getName() << std::endl;
        std::cout << "Leader values: " << leaders[0]->getValues(indices)[0] << std::endl;
    }
    std::cout << "People size:" << people.size() << std::endl;
    if (!people.empty())
    {
        std::cout << "Person name: " << people[0]->getName() << std::endl;
        std::cout << "Person values: " << people[0]->getValues(indices)[0] << std::endl;
    }
}

double* toArray(const py::list &list)
{
    double *arr = new double[len(list)];
    for (int i = 0; i < len(list); ++i)
    {
        arr[i] = py::extract<double>(list[i]);
    }
    return arr;
}

