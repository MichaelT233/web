// top level react component

import {
    HashRouter,
    Routes,
    Route,
} from "react-router-dom";
import React from "react";
import * as Shell from "../ui/component"
import * as Product from "../../product-client/ui/component";
import * as Order from "../../order-client/ui/component";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

// client side router for SPA, renders service level components within ui shell
export function Router(): JSX.Element {
    return (
		<HashRouter>
			<QueryClientProvider client={queryClient}>
				<div>
					<Shell.Header />
					<div>
						<Routes>
							<Route path ="/" element={<Product.Featured />} />
							<Route path="/category/:category" element={<Product.Category />} />
							<Route path="/search/:text" element={<Product.Search />} />
							<Route path="/item/:id" element={<Order.Item />} />
                            <Route path="/cart" element={<Order.CartListing />} />
                            <Route path="/about" element={<Shell.About />} />
                            <Route path="/contact" element={<Shell.Contact />} />
						</Routes>
					</div>
					<Shell.Footer />
				</div>
			</QueryClientProvider>
		</HashRouter>
    );
}
