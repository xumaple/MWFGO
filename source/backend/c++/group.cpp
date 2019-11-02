#include "group.h"
#include "individual.h"
#include "limiter.h"
#include "utility.h"
#include <stdexcept>

Group::Group(std::vector<Limiter *> &limitersIn, Individual *leaderIn): leader(leaderIn) {
    limiters = std::move(limitersIn);
    for (Limiter *l: limiters) {
        if (!l->addIndividual(*leader)) {
            throw Error("Leader cannot be added to group.");
        }
    }
}

bool Group::addIndividual(Individual &ind) {
    for (auto limit = limiters.begin(); limit != limiters.end(); ++limit) {
        if (!(*limit)->addIndividual(ind)) {
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
