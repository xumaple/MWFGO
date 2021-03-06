#include "limiter.h"
#include "individual.h"
#include "constraintDiff.h"
#include <iostream>

bool Limiter::addIndividual(Individual *ind) {
    if (!canAddIndividual(ind)) return false;
    
    addHelper(ind);
    return true;
}

void Limiter::cancelAdd() {
    individuals.pop_back();
}

void Limiter::forceAdd(Individual *ind) {
    ++forceAdded;
    addHelper(ind);
}

void Limiter::addHelper(Individual *ind) {
    for (Individual *i: individuals) {
        currCost += ind->getDiff(i)->getCost();
    }
    individuals.push_back(ind);
}

void Limiter::clearLimiter() {
    while (currIndividuals().size() > 1) {
        currIndividuals().pop_back();
    }
}
