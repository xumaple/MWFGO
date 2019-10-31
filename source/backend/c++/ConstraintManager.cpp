#include "ConstraintManager.h"

std::vector<Constraint *> ConstraintManager::constraints = std::vector<Constraint *>();
std::map<std::string, int> ConstraintManager::constraintNames = std::map<std::string, int>();

void ConstraintManager::addConstraint(Constraint *constraint, std::string &name) {
    constraintNames.at(name) = int(constraints.size());
    constraints.push_back(constraint);
}
