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
        groups.push_back(new Group(limiters, l));
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
    //Initialize random seed
    srand(time(NULL));

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
    leaders.push_back(new Individual(arr, name));

    //Create a group with the leader
}

void GroupOrganizer::addPerson(std::string name, py::list &traits)
{
    //Create a person
    double* arr = toArray(traits);
    people.push_back(new Individual(arr, name));
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
    bool single_perms = people.size() % groups.size() == 0;
    std::sort(people.begin(), people.end());
    do
    {
        // Calculate permutations of groups
        /*if (!single_perms)
        {
            std::sort(groups.begin(), groups.end());
            do
            {
                // Check if this permutation satisfies the grouping
                size_t i = 0
                for (; i < people.size(); ++i)
                {
                    if (!groups[i % groups.size()]->addIndividual(people[i]))
                    {
                        clearGroups();
                        break;
                    }
                }
            } while (std::next_permutation(groups.begin(), groups.end()));
        }*/

        // Check if this permutation satisfies the grouping
        size_t i = 0
        for (; i < people.size(); ++i)
        {
            if (!groups[i % groups.size()]->addIndividual(people[i]))
            {
                clearGroups();
                break;
            }
        }

        //Check if permutation worked
        if (i == people.size())
        {
            break;
        }
    } while (std::next_permutation(people.begin(), people.end()));
    
}

void GroupOrganizer::runAlgorithm()
{
    assert(groups.empty());
    createGroups();
    partA();
    genPerms();
    //partB();
    //partC();
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

