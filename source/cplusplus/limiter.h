#ifndef limiter_h
#define limiter_h

#include <vector>

class Individual;

class Limiter {
public:
    Limiter(): currCost(0), forceAdded(0) {}
    virtual ~Limiter() {}
    
    bool addIndividual(Individual *ind);
    virtual void cancelAdd();
    void forceAdd(Individual *ind);
    double getCost() const { return currCost; }
    void clearTime() { clearLimiter(); }
    
protected:
    virtual bool canAddIndividual(Individual *ind) = 0;
    virtual void addHelper(Individual *ind);
    virtual void clearLimiter();
    
    int numForceAdded() const { return forceAdded; }
    std::vector<Individual *> &currIndividuals() { return individuals; }
private:
    double currCost; // Current cost estimates
    int forceAdded; // Tally of number of individuals force added
                    // Used as a part of canAddIndividual
    std::vector<Individual *> individuals;
    
};


#endif /* limiter_h */
