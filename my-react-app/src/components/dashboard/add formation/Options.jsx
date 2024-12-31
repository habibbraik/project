import React from 'react';
import Addfor from './Addfor';

const Options = () => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = (option) => {
        setSelectedOption(option);
        console.log('Selected option:', option);
    };

    const options = [
        { value: 'élève', label: 'Option 1' },
        { value: 'étudient', label: 'Option 2' },
        { value: 'professionnel', label: 'Option 3' },
        { value: 'doctorat', label: 'Option 4' },
    ];

return (
    <div>
        <h1>Select an Option</h1>
        <Addfor options={options} onSelect={handleSelect} />
        {selectedOption && <p>You selected: {selectedOption}</p>}
    </div>
)
}

export default Options