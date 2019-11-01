#include "constraintManager.h"

void ConstraintManager::addConstraint(Constraint *constraint, std::string &name) {
    constraintNames.at(name) = int(constraints.size());
    constraints.push_back(constraint);
}

ConstraintManager &ConstraintManager::getInstance() {
    static ConstraintManager manager;
    return manager;
}