#include <string>
#include <iostream>
#include "group.h"
#include "individual.h"
#include "timeConstraint.h"
#include "constraintManager.h"
#include "weightLimiter.h"
#include "catch.hpp"

TEST_CASE( "Basic functionality testcase", "[basic]" ) {
    ConstraintManager &m = ConstraintManager::getInstance();
    std::string name = "schedule";
    m.addConstraint(new TimeConstraint(), name);
    std::vector<Individual> peoples;
    peoples.emplace_back(new double(4.00000006));
    peoples.emplace_back(new double(1.00000004));
    peoples.emplace_back(new double(2.00000008));
    peoples.emplace_back(new double(3.00000007));
    
    for (auto it = peoples.begin(); it != peoples.end(); ++it) {
        auto nextIt = it;
        for (++nextIt; nextIt != peoples.end(); ++nextIt) {
            Individual::computeDiffs(*it, *nextIt);
        }
    }
    std::vector<Limiter *> v(1, new WeightLimiter());
    
    
    Group g(v, &peoples[0]);
    
    bool one = g.addIndividual(peoples[1]);
    bool two = g.addIndividual(peoples[2]);
    bool three = g.addIndividual(peoples[3]);
    
    REQUIRE( !one );
    REQUIRE( two );
    REQUIRE( three );
    
    delete &m.getConstraint(name);
}

