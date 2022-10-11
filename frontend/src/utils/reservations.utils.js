import isEqual from 'date-fns/isEqual'
import addSeconds from 'date-fns/addSeconds'

export const addEventsWithSameDate = (
    daysSelected,
    events,
    setEventsSelected,
) => {
    const newEvents = []
    daysSelected.forEach(daySelect => {
        events.forEach(event => {
            if (
                isEqual(addSeconds(daySelect, 1), new Date(event.start)) ||
                isEqual(addSeconds(daySelect, 1), new Date(event.end))
            ) {
                newEvents.push(event)
            }
        })
    })
    setEventsSelected(
        newEvents.filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i),
    )
}

export const checkIfAllDaysAreSelected = (daysSelected, type) => {
    if (type?.value === 'beginner_skipper' && daysSelected.length === 4) {
        return false
    } else if (
        type?.value === 'initiation_sailing' &&
        daysSelected.length === 2
    ) {
        return false
    } else if (type?.value === 'spinnaker' && daysSelected.length === 1) {
        return false
    } else {
        return true
    }
}

export const resetCalendar = (setDaysSelected, setEventsSelected) => {
    setDaysSelected([])
    setEventsSelected([])
}
