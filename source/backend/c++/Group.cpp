#include "Group.h"
#include "Individual.h"
#include "Limiter.h"

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
