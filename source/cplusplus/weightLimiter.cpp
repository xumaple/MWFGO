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
    return (totalWeight + lastWeight) / (currIndividuals().size() + 1) > WEIGHT_THRESHOLD;
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

void WeightLimiter::clearLimiter() {
    totalWeight = 1;
    lastWeight = 0;
    lastIndividual = nullptr;
    Limiter::clearLimiter();
}