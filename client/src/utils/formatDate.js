import { format } from 'date-fns';

const formatDate = (timestamp) => {
    if(!timestamp)
        return '';

    return format(new Date(timestamp.seconds * 1000), 'p')
}

export default formatDate;