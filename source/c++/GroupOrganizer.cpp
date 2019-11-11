#include "GroupOrganizer.h"
#include <string>
#include <vector>

GroupOrganizer::GroupOrganizer()
{
    cm = &ConstraintManager::getInstance();
}

GroupOrganizer::~GroupOrganizer()
{
    //Delete constraints
    
    //Delete leaders
    
    //Delete people
    
    //Delete Groups
    
    //Delete limiters
}

void GroupOrganizer::addLeader(std::string name, std::vector<double> traits)
{
    //Create a leader

    //Create a group with the leader
}

void GroupOrganizer::addPerson(std::string name, std::vector<double> traits)
{
    //Create a person

    //Add person to list of people
}

void GroupOrganizer::addTrait(std::string name, int formType, int numChoices)
{
    //Create a constraint

    //Add constraint to constraint manager

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

