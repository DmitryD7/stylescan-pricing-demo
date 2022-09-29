export interface IPlan {
    title: string
    price: number
    description: string[]
    isMostPopular: boolean
}

export type PlansType = Array<IPlan>

export const entryPlan: IPlan = {
    title: 'Entry',
    price: 66,
    description: [
        '20 SKUs rendered on models (front & back)',
        'Basic model gallery to choose from',
        '40 credits to generate on model images',
    ],
    isMostPopular: false,
}

export const basicPlan: IPlan = {
    title: 'Basic',
    price: 99,
    description: [
        '40 SKUs rendered on models (front & back)',
        'Premium model gallery to choose from',
        '80 credits to generate on model images',
    ],
    isMostPopular: true,
}

export const enterprisePlan: IPlan = {
    title: 'Enterprise',
    price: 0,
    description: [
        'Custom number of SKUs rendered on models (front & back)',
        'Elite model gallery to choose from',
        'Custom number of credits to generate on model images',
    ],
    isMostPopular: false
}

export const plans: PlansType = [entryPlan, basicPlan, enterprisePlan]