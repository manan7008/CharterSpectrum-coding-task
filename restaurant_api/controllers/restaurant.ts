import * as express from 'express';
import { Restaurant } from "../models/index";

class RestaurantController {
    public path = '/restaurant';
    public router = express.Router();

    private posts = [
        {
            author: 'Marcin',
            content: 'Dolor sit amet',
            title: 'Lorem Ipsum',
        }
    ];

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path + '/', this.getAllRestaturants);
        this.router.post(this.path + '/', this.createRestaturant);
        this.router.put(this.path + '/:id', this.updateRestaturant);
        this.router.delete(this.path + '/:id', this.deleteRestaturant);
    }

    getAllRestaturants = async (request: express.Request, response: express.Response) => {
        let { limit, skip, sort } = request.query;
        const limit_data = Number(limit || '10');
        const skip_data = Number(skip || '0');
        sort = sort || 'name';
        const data = await Restaurant.find({}, {}, { skip: skip_data, limit: limit_data, sort });
        const total = await Restaurant.count({});
        response.send({ data, total });
    }

    createRestaturant = async (request: express.Request, response: express.Response) => {
        const restaurant = new Restaurant({ ...request.body });
        const result = await restaurant.save();
        response.send(result);
    }

    updateRestaturant = async (request: express.Request, response: express.Response) => {
        const result = await Restaurant.findByIdAndUpdate({ '_id': request.params.id }, { ...request.body });
        response.send(result);
    }

    deleteRestaturant = async (request: express.Request, response: express.Response) => {
        const result = await Restaurant.findByIdAndDelete({ '_id': request.params.id });
        response.send(result);
    }

}

export default RestaurantController;