import Table from './Table.vue';
import ThreeDotsIcon from '../../assets/icons/misc/three-dots.svg';
import ArrowIcon from '../../assets/icons/arrows/ChevronDown.svg';

/* ArrowIcon NOTE:
use this single arrow icon (it points downwards),
then use a class for css to rotate it to point to any direction you want,
for example transform: rotate(180deg), will have arrow point upwards
We will load less resources by using this method
*/

// for the actions column
export { ThreeDotsIcon, ArrowIcon };

export default Table;
