import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import React from "react";
import { Header, Footer } from "../ui-shell/shell";
import { Product} from "../../product-client/ui/component";

function Router() {
    return (
		<BrowserRouter>
			<div>
				<Header/>
				<div>
					<Routes>
						<Route path="product/:id" children={<Product />} />
					</Routes>
				</div>
				<Footer/>
			</div>
		</BrowserRouter>
    );
}
