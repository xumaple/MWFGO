#ifndef weightLimiter_h
#define weightLimiter_h

#include "limiter.h"

class WeightLimiter : public Limiter {
public:
    WeightLimiter(): Limiter(), totalWeight(0), lastIndividual(nullptr) {}

    virtual void cancelAdd() override;

protected:
    virtual bool canAddIndividual(Individual *ind) override;
    virtual void addHelper(Individual *ind) override;

private:
    constexpr static const double WEIGHT_THRESHOLD = 0.8;

    double totalWeight;
    double lastWeight;
    Individual *lastIndividual;

    void calculateLastWeight(Individual *ind);
};


#endif /* weightLimiter_h */
