#include <string>
#include <iostream>
#include "group.h"
#include "individual.h"
#include "timeConstraint.h"
#include "constraintManager.h"
#include "weightLimiter.h"

void tryAdd(Group &g, Individual &i) {
    std::string s = g.addIndividual(i) ? "True" : "False";
    std::cout << s << std::endl;
}

int main() {
    ConstraintManager &m = ConstraintManager::getInstance();
    std::string name = "schedule";
    m.addConstraint(new TimeConstraint(), name);
    std::vector<Individual> peoples;
    peoples.emplace_back(new double(1.00000004));
    peoples.emplace_back(new double(2.00000008));
    peoples.emplace_back(new double(4.00000006));
    
    for (auto it = peoples.begin(); it != peoples.end(); ++it) {
        auto nextIt = it;
        for (++nextIt; nextIt != peoples.end(); ++nextIt) {
            Individual::computeDiffs(*it, *nextIt);
        }
    }
    std::vector<Limiter *> v(1, new WeightLimiter());
    

    Group g(v, &peoples[2]);

    tryAdd(g, peoples[0]);
    tryAdd(g, peoples[1]);

    delete &m.getConstraint(name);
}
