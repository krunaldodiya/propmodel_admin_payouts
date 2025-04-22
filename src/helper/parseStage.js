/**
 * Parse the current stage number from a group string
 * @param {string} group - The group string to parse
 * @returns {number|string} - The extracted stage number
 */
const parseCurrentStage = (group) => {
    if (group) { 
        const pattern = /(?<=-)(\d)(?=-)|(\((\d+)\))/;
        const matches = group.match(pattern);
        
        if (matches) {
            return matches[1] || matches[0];
        }
    }
    return 1;
};

export { parseCurrentStage };