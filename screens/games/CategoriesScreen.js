import {useCategories} from 'hooks';
import {CategoryScreen} from './CategoryScreen';

export function CategoriesScreen()
{
    const {currentTab, columns, games} = useCategories();

    return (
        <CategoryScreen
            games={games}
            columns={columns}
            tab={currentTab.subTab}
            key={currentTab.subTab}
        />
    );
}
