export interface IPlan {
    title: string
    priceUI: number
    description: string[]
    isMostPopular: boolean
    price: string
    quantity: number
}

export type PlansType = Array<IPlan>

export const entryPlan: IPlan = {
    title: 'Entry',
    priceUI: 66,
    description: [
        '20 SKUs rendered on models (front & back)',
        'Basic model gallery to choose from',
        '40 credits to generate on model images',
    ],
    price: 'price_1Ln958J2kUT5tEEg20aPiB6u',
    quantity: 1,
    isMostPopular: false,
}

export const basicPlan: IPlan = {
    title: 'Basic',
    priceUI: 99,
    description: [
        '40 SKUs rendered on models (front & back)',
        'Premium model gallery to choose from',
        '80 credits to generate on model images',
    ],
    price: 'price_1Ln96ZJ2kUT5tEEgyLd4Y61v',
    quantity: 1,
    isMostPopular: true,
}

export const enterprisePlan: IPlan = {
    title: 'Enterprise',
    priceUI: 0,
    description: [
        'Custom number of SKUs rendered on models (front & back)',
        'Elite model gallery to choose from',
        'Custom number of credits to generate on model images',
    ],
    price: '',
    quantity: 0,
    isMostPopular: false
}

export const plans: PlansType = [entryPlan, basicPlan, enterprisePlan]