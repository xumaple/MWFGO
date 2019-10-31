#ifndef Limiter_h
#define Limiter_h

#include <vector>

class Individual;

class Limiter {
public:
    Limiter(): currCost(0), forceAdded(0) {}
    virtual ~Limiter() {}
    
    bool addIndividual(Individual &ind);
    void cancelAdd();
    void forceAdd(Individual &ind);
    double getCost() const { return currCost; }
    
protected:
    virtual bool canAddIndividual(Individual &ind) = 0;
    int numForceAdded() const { return forceAdded; }
    
private:
    double currCost; // Current cost estimates
    int forceAdded; // Tally of number of individuals force added
                    // Used as a part of canAddIndividual
    std::vector<Individual> individuals;
    
    void addHelper(Individual &ind);
};


#endif /* Limiter_h */
