#include "group.h"
#include "individual.h"
#include "limiter.h"
#include "utility.h"
#include <stdexcept>
#include <algorithm>

Group::Group(std::vector<Limiter *> &limitersIn, Individual *leaderIn): leader(leaderIn) {
    limiters = std::move(limitersIn);
    for (Limiter *l: limiters) {
        if (!l->addIndividual(leader)) {
            throw Error("Leader cannot be added to group.");
        }
    }

    //For now size limit is 5. Change so leader information can change this
    sizeLimit = 5;
}

bool Group::addIndividual(Individual *ind, bool force) {
    // Group cannot fit any more members
    if (members.size() >= sizeLimit) {
        return false;
    }

    for (auto limit = limiters.begin(); limit != limiters.end(); ++limit) {
        //If we want to force add individual to group
        if (force) {
            (*limit)->forceAdd(ind);
        }
        //Otherwise if individual fails any limiter we return
        else if (!(*limit)->addIndividual(ind)) {
            std::for_each(limiters.begin(), limit, [](Limiter *l) { l->cancelAdd(); });
            return false;
        }
    }
    members.push_back(ind);
    return true;
}

double Group::getCost() const {
    int totalCost = 0;
    for (const Limiter *l: limiters) totalCost += l->getCost();
    return totalCost;
}

void Group::clearMembers()
{
    members.clear();
}

std::vector<Individual*>& Group::getMembers()
{
    return members;
}

Individual* Group::getLeader()
{
    return leader;
}

size_t Group::getSize()
{
    return sizeLimit;
}