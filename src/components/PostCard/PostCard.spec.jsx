import { render, screen } from '@testing-library/react'
import { PostCard } from '.' 
import { postCardPropMock } from './mock';


const props = postCardPropMock;

describe('<PostCard />', ()=>{
    it('should render PostCard correctly', ()=>{
        const { debug } = render(<PostCard {...props} />);
        //debug();

        expect(screen.getByRole('img', {name: 'title 1'}))
        .toHaveAttribute('src', 'img/img.png');

        expect(screen.getByRole('heading', { name: /title/i })).toBeInTheDocument();

        expect(screen.getByText('body 1')).toBeInTheDocument();
    });


    //Teste de snapshot
    it('should match snapshot', ()=>{
        const { container } = render(<PostCard {...props} />);
        expect( container.firstChild ).toMatchSnapshot();


    });
});