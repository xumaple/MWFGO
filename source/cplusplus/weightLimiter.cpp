#include "weightLimiter.h"
#include "individual.h"
#include "constraintDiff.h"
#include <iostream>

void WeightLimiter::cancelAdd() {
    Limiter::cancelAdd();
    totalWeight -= lastWeight;
    lastWeight = 0;
    lastIndividual = nullptr;
}

bool WeightLimiter::canAddIndividual(Individual *ind) {
    calculateLastWeight(ind);
    // Removed currIndividuals().empty()
    std::cout << "totalWeight: " << totalWeight << std::endl;
    std::cout << "lastWeight: " << lastWeight << std::endl;
    return (totalWeight + lastWeight) > WEIGHT_THRESHOLD;
}

void WeightLimiter::addHelper(Individual *ind) {
    if (ind != lastIndividual) {
        calculateLastWeight(ind);
    }
    Limiter::addHelper(ind);
    totalWeight += lastWeight;
}

void WeightLimiter::calculateLastWeight(Individual *ind) {
    lastWeight = 0;
    lastIndividual = ind;
    for (Individual *i: currIndividuals()) {
        lastWeight += ind->getDiff(i)->getWeight();
    }
}
