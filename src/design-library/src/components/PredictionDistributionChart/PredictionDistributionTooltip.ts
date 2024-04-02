const Tooltip = `
    <div style="background:#FFF;font-family: Figtree;color: #131F3C">
                <div
                    style=" width:175px; height: 35px;display: flex;align-items: center;justify-content:flex-start;gap: 5px;font-size: 14px;font-style: normal;font-weight: 600;line-height: normal;border-radius: 4px 4px 0px 0px; border: 1px solid #D8DBE0;padding: 8px;">
                    <div style="background:{color};height:12px;width:12px; border-radius: 2.155px;"></div>
                    <div>{predicted}</div>
                    <div>- {dataValue}</div>
                </div>
                <div style="display: flex;flex-direction: column;padding: 8px;justify-content: center; gap:8px; width: 175px; height: 80px;font-size: 12px;font-style: normal;font-weight: 400;background: #F9FAFB;border-right: 1px solid #D8DBE0; border-bottom: 1px solid #D8DBE0; border-left: 1px solid #D8DBE0;">
                    <div style="display: flex;flex-direction: row;justify-content: space-between;">
                        <span>Example Value</span><span>9.31%</span>
                    </div>
                    <div style="display: flex;flex-direction: row;justify-content: space-between;">
                        <span>Lorem ipsum</span><span>$102K</span>
                    </div>
                    <div style="display: flex;flex-direction: row;justify-content: space-between;">
                        <span>Another one</span><span>25.7%</span>
                    </div>
                </div>
            </div>
`;
export default Tooltip;
