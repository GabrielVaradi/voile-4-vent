export const coursesTypes = {
    beginner_skipper: {
        value: 'beginner_skipper',
        label: 'beginner_skipper_label',
        days: 4,
    },
    intermediate_skipper: {
        value: 'intermediate_skipper',
        label: 'intermediate_skipper_label',
        days: 7,
    },
    initiation_sailing: {
        value: 'initiation_sailing',
        label: 'initiation_sailing_label',
        days: 2,
    },
    regatta: { value: 'regatta', label: 'regatta_label', days: 5 },
}

export const reservableCoursesType = [
    coursesTypes.beginner_skipper.value,
    coursesTypes.initiation_sailing.value,
]
