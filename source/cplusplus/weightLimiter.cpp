#include "weightLimiter.h"
#include "individual.h"
#include "constraintDiff.h"

void WeightLimiter::cancelAdd() {
    Limiter::cancelAdd();
    totalWeight -= lastWeight;
    lastWeight = 0;
    lastIndividual = nullptr;
}

bool WeightLimiter::canAddIndividual(Individual *ind) {
    calculateLastWeight(ind);
    return currIndividuals().empty() 
        || (totalWeight + lastWeight) / (currIndividuals().size() + 1) > WEIGHT_THRESHOLD;
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
    // Do we need to normalize weights?
    lastWeight /= currIndividuals().size();
}
