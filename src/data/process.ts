/**
 * ProcessStep fixtures: "how an estimate works".
 */

import type { ProcessStep } from "@/domain";

export const processSteps: readonly ProcessStep[] = [
    {
        id: "step-send-request",
        order: 1,
        title: "Send your request",
        description:
            "Tell us what needs doing and add a few photos. The more we can see, the better we can scope the work.",
    },
    {
        id: "step-review-estimate",
        order: 2,
        title: "We review and write it up",
        description:
            "We look over your request and photos, ask follow-up questions or arrange a site visit if the job needs one, then send a written estimate.",
    },
    {
        id: "step-approve",
        order: 3,
        title: "Approve the estimate",
        description:
            "Read the scope and total. If it looks right, approve it online. If not, ask questions or decline, no pressure.",
    },
    {
        id: "step-deposit-schedule",
        order: 4,
        title: "Deposit and scheduling",
        description:
            "Pay the deposit online, then we agree on dates. The balance is invoiced online when the work is done.",
    },
];