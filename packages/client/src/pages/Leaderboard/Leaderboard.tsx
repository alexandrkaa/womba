import { withProtection } from "@containers";
import { LeaderBoard } from "@containers";

import "./styles.scss";

export const LeaderBoardPage = withProtection(() => {
    return (
        <div className="leaders-page">
            <LeaderBoard />
        </div>
    );
});
